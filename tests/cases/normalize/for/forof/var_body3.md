# Preval test case

# var_body3.md

> Normalize > For > Forof > Var body3
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
for(const n of [1,2,3]) var x;
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
for (const n of [1, 2, 3]) x = undefined;
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpForOfDeclRhs = [1, 2, 3];
let n = undefined;
for (n of tmpForOfDeclRhs) {
  x = undefined;
}
$(x);
`````

## Output


`````js filename=intro
let n = undefined;
const tmpForOfDeclRhs = [1, 2, 3];
for (n of tmpForOfDeclRhs) {
}
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = [ 1, 2, 3 ];
for (a of b) {

}
$( undefined );
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
