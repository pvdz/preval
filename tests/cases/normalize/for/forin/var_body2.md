# Preval test case

# var_body2.md

> Normalize > For > Forin > Var body2
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
for(const n in {a: 1, b: 2}) var x = n;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpForInDeclRhs = { a: 1, b: 2 };
let n;
for (n in tmpForInDeclRhs) {
  x = n;
}
$(x);
`````

## Output

`````js filename=intro
let x = undefined;
const tmpForInDeclRhs = { a: 1, b: 2 };
let n;
for (n in tmpForInDeclRhs) {
  x = n;
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'b'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
