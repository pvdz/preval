# Preval test case

# var_body.md

> Normalize > For > Forof > Var body
>
> Var as body of a do-while

## Input

`````js filename=intro
for(const n of [1,2,3]) var x = n;
`````

## Pre Normal


`````js filename=intro
let x = undefined;
for (const n of [1, 2, 3]) x = n;
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpForOfDeclRhs = [1, 2, 3];
let n = undefined;
for (n of tmpForOfDeclRhs) {
  x = n;
}
`````

## Output


`````js filename=intro
let n = undefined;
const tmpForOfDeclRhs = [1, 2, 3];
for (n of tmpForOfDeclRhs) {
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = [ 1, 2, 3 ];
for (a of b) {

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
