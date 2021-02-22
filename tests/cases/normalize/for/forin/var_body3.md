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

## Normalized

`````js filename=intro
var x;
const tmpForInDeclRhs = { a: 1, b: 2 };
let n;
for (n in tmpForInDeclRhs) {
  x = undefined;
}
$(x);
`````

## Output

`````js filename=intro
var x;
const tmpForInDeclRhs = { a: 1, b: 2 };
let n;
for (n in tmpForInDeclRhs) {
  x = undefined;
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same