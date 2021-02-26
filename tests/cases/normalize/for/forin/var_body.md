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

## Normalized

`````js filename=intro
let x = undefined;
const tmpForInDeclRhs = { a: 1, b: 2 };
let n;
for (n in tmpForInDeclRhs) {
  x = n;
}
`````

## Output

`````js filename=intro
const tmpForInDeclRhs = { a: 1, b: 2 };
let n;
for (n in tmpForInDeclRhs) {
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
