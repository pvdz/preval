# Preval test case

# order.md

> normalize > hoisting > var > order
>
> Check order of moving them up. We try to keep the order, even if it shouldn't matter.

#TODO

## Input

`````js filename=intro
$(a, b, c);
var a = $();
var b = $();
var c = $();
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
$(a, b, c);
a = $();
b = $();
c = $();
`````

## Output

`````js filename=intro
var a;
var b;
var c;
$(a, b, c);
a = $();
b = $();
c = $();
`````

## Result

Should call `$` with:
[[null, null, null], [], [], [], null];

Normalized calls: Same

Final output calls: Same
