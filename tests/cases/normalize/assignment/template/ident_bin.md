# Preval test case

# ident_bin.md

> normalize > assignment > template > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$(`abc ${a = b + c} def`)
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
let a = 1;
let b = 2;
let c = 3;
tmpArg = `abc ${(a = b + c)} def`;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
let a = 1;
tmpArg = `abc ${(a = 5)} def`;
$(tmpArg);
$(a, 5, 3);
`````

## Result

Should call `$` with:
[['abc 5 def'], [5, 2, 3], null];

Normalized calls: Same

Final output calls: BAD!!
[['abc 5 def'], [5, 5, 3], null];

