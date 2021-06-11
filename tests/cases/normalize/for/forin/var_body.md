# Preval test case

# var_body.md

> Normalize > For > Forin > Var body
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
for(const n in {a: 1, b: 2}) var x = n;
`````

## Pre Normal

`````js filename=intro
let x = undefined;
for (const n in { a: 1, b: 2 }) x = n;
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpForInDeclRhs = { a: 1, b: 2 };
let n = undefined;
for (n in tmpForInDeclRhs) {
  x = n;
}
`````

## Output

`````js filename=intro
let n = undefined;
const tmpForInDeclRhs = { a: 1, b: 2 };
for (n in tmpForInDeclRhs) {
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
