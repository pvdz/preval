# Preval test case

# order.md

> Normalize > Hoisting > Var > Order
>
> Check order of moving them up. We try to keep the order, even if it shouldn't matter.

#TODO

## Input

`````js filename=intro
$(a, b, c);
var a = $();
var c = $();
var b = $();
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
$(a, b, c);
a = $();
c = $();
b = $();
`````

## Output

`````js filename=intro
$(undefined, undefined, undefined);
$();
$();
$();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined, undefined, undefined
 - 2: 
 - 3: 
 - 4: 
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
