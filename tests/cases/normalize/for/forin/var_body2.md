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

## Pre Normal

`````js filename=intro
let x = undefined;
for (const n in { a: 1, b: 2 }) x = n;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpForInDeclRhs = { a: 1, b: 2 };
let n = undefined;
for (n in tmpForInDeclRhs) {
  x = n;
}
$(x);
`````

## Output

`````js filename=intro
let x = undefined;
let n = undefined;
const tmpForInDeclRhs = { a: 1, b: 2 };
for (n in tmpForInDeclRhs) {
  x = n;
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
let b = undefined;
const c = {
a: 1,
b: 2
;
for (b in c {
  a = b;
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
