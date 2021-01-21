# Preval test case

# ident_simple.md

> normalize > assignment > template > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$(`abc ${a = b} def`)
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
let a = 1;
let b = 2;
let c = 3;
tmpArg = `abc ${(a = b)} def`;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
let a = 1;
tmpArg = `abc ${(a = 2)} def`;
$(tmpArg);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: "abc 2 def"
 - 1: 2,2,3
 - 2: undefined

Normalized calls: Same

Final output calls: Same
