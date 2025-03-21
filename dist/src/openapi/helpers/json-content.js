function jsonContent(schema, description) {
    return {
        content: {
            "application/json": {
                schema,
            },
        },
        description,
    };
}
export default jsonContent;
