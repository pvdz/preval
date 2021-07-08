# Preval test case

# var_body3.md

> Normalize > For > Forin > Var body3
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
for(const n in {a: 1, b: 2}) var x;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
for (const n in { a: 1, b: 2 }) x = undefined;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpForInDeclRhs = { a: 1, b: 2 };
let n = undefined;
for (n in tmpForInDeclRhs) {
  x = undefined;
}
$(x);
`````

## Output

`````js filename=intro
let n = undefined;
const tmpForInDeclRhs = { a: 1, b: 2 };
for (n in tmpForInDeclRhs) {
}
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
