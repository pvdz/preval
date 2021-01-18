# Preval test case

# sequence_simple_prop.md

> normalize > assignment > sequence_simple_prop
>
> An assignment with rhs of a property on a sequence that ends with a simple node

Relevant for intermediate artifacts.

#TODO

## Input

`````js filename=intro
let a = 0;
a = 'Identifier'.length === 'woop'.length;
$(a);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
let a = 0;
tmpBinaryLeft = 'Identifier'.length;
tmpBinaryRight = 'woop'.length;
a = tmpBinaryLeft === tmpBinaryRight;
$(a);
`````

## Output

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
let a = 0;
tmpBinaryLeft = 'Identifier'.length;
tmpBinaryRight = 'woop'.length;
a = tmpBinaryLeft === tmpBinaryRight;
$(a);
`````

## Result

Should call `$` with:
[[false], null];

Normalized calls: Same

Final output calls: Same
