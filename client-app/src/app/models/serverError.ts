// contains fields from Application/AppException.cs
export interface ServerError {
	statusCode: number;
	message: string;
	details: string;
}
