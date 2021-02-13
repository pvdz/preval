# Preval test case

# ident_sequence_complex.md

> normalize > assignment > export-default > ident_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = 2, c = 3;
export let a = ($(b), $(c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 2;
let c = 3;
$(b);
let a = $(c);
export { a };
$(a, b, c);
`````

## Output

`````js filename=intro
let b = 2;
let c = 3;
$(b);
let a = $(c);
export { a };
$(a, b, c);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same