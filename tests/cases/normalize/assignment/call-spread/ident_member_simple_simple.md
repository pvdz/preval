# Preval test case

# ident_member_simple_simple.md

> normalize > assignment > call-spread > ident_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
$(...(a = b.x = c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedComplexRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
b.x = c;
tmpNestedComplexRhs = c;
a = tmpNestedComplexRhs;
tmpArg = tmpNestedComplexRhs;
$(...tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedComplexRhs;
let a = 1;
let b = { x: 2 };
b.x = 3;
tmpNestedComplexRhs = 3;
a = tmpNestedComplexRhs;
tmpArg = tmpNestedComplexRhs;
$(...tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
['<crash[ Found non-callable @@iterator ]>'];

Normalized calls: Same

Final output calls: Same
