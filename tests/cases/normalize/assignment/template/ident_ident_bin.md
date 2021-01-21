# Preval test case

# ident_ident_bin.md

> normalize > assignment > template > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
$(`abc ${a = b = c + d} def`)
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
tmpArg = `abc ${((tmpNestedComplexRhs = c + d), (b = tmpNestedComplexRhs), (a = tmpNestedComplexRhs))} def`;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
tmpArg = `abc ${((tmpNestedComplexRhs = 7), (b = tmpNestedComplexRhs), (a = tmpNestedComplexRhs))} def`;
$(tmpArg);
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: "abc 7 def"
 - 1: 7,7,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[['abc 7 def'], [7, 7, 7], null];

