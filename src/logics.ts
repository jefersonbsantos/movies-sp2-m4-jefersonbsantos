import { Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "./database";

const create = async (req: Request, res: Response): Promise<Response> => {
  const queryString: string = format(
    `
    INSERT INTO movies(%I)
    VALUES(%L)
    RETURNING *;
    `,
    Object.keys(req.body),
    Object.values(req.body)
  );

  const queryResult: QueryResult = await client.query(queryString);

  return res.status(201).json(queryResult.rows[0]);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const queryStringCategory: string = `
    	SELECT * FROM movies
      WHERE category = $1;
  `;

  const queryResultCategory: QueryResult = await client.query(
    queryStringCategory,
    [req.query.category]
  );

  if (queryResultCategory.rowCount > 0) {
    return res.status(200).json(queryResultCategory.rows);
  }

  const queryString: string = `SELECT * FROM movies;`;
  const queryResult: QueryResult = await client.query(queryString);

  return res.status(200).json(queryResult.rows);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const { foundMovie } = res.locals;

  return res.status(200).json(foundMovie);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const queryString: string = format(
    `
    	UPDATE movies 
      SET(%I) = ROW(%L)
      WHERE id = $1
      RETURNING *;
  `,
    Object.keys(req.body),
    Object.values(req.body)
  );

  const queryResult: QueryResult = await client.query(queryString, [
    req.params.id,
  ]);

  return res.status(200).json(queryResult.rows[0]);
};

const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
  const queryString: string = `
    DELETE FROM movies
    WHERE id = $1;
  `;

  await client.query(queryString, [req.params.id]);

  return res.status(204).json();
};

export { create, read, retrieve, update, deleteMovie };
