# Preval test case

# ident_simple.md

> normalize > assignment > arr-spread > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$([...(a = b)]);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpElement;
let a = 1;
let b = 2;
let c = 3;
a = b;
tmpElement = b;
tmpArg = [...tmpElement];
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpElement;
let a = 1;
a = 2;
tmpElement = 2;
tmpArg = [...tmpElement];
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
['<crash[ <ref> is not iterable ]>'];

Normalized calls: Same

Final output calls: Same
