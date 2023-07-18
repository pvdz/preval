# Preval test case

# var_body2.md

> Normalize > For > Forof > Var body2
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
for(const n of [1,2,3]) var x = n;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
for (const n of [1, 2, 3]) x = n;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpForOfDeclRhs = [1, 2, 3];
let n = undefined;
for (n of tmpForOfDeclRhs) {
  x = n;
}
$(x);
`````

## Output

`````js filename=intro
let x = undefined;
let n = undefined;
const tmpForOfDeclRhs = [1, 2, 3];
for (n of tmpForOfDeclRhs) {
  x = n;
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
let b = undefined;
const c = [ 1, 2, 3,, ];
for (b of c {
  a = b;
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
