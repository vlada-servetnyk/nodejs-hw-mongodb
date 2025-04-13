import createHttpError from 'http-errors';

export const validateBody = schema => {
    const functionValid = async (req, res, next)=> {
        try {
            await schema.validateAsync(req.body, {
              abortEarly: false,
            });
            next();
          }
        catch (error) {
          console.log(error);
            next(createHttpError(400, error.message));
          }
    };

    return functionValid;
};