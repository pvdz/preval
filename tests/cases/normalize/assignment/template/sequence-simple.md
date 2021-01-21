# Preval test case

# sequence-simple.md

> normalize > assignment > template > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
$(`abc ${(a, b).c = d} def`);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
let a = 1;
let b = { c: 2 };
let d = 3;
tmpArg = `abc ${((a, b).c = d)} def`;
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
let b = { c: 2 };
tmpArg = `abc ${((1, b).c = 3)} def`;
$(tmpArg);
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: "abc 3 def"
 - 1: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same
