# Preval test case

# ident_ident_bin.md

> normalize > assignment > throw > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
throw a = b = c + d;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
{
  tmpNestedComplexRhs = c + d;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  let tmpStmtArg = a;
  throw tmpStmtArg;
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
tmpNestedComplexRhs = 7;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpStmtArg = a;
throw tmpStmtArg;
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: <crash[ 7 ]>

Normalized calls: Same

Final output calls: Same
