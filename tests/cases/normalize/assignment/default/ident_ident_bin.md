# Preval test case

# ident_ident_bin.md

> normalize > assignment > default > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
switch ($('a')) { default: a = b = c + d; }
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
  const tmpSwitchTest = $('a');
  {
    let tmpFallthrough = false;
    {
      ('default case:');
      tmpNestedComplexRhs = c + d;
      b = tmpNestedComplexRhs;
      a = tmpNestedComplexRhs;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
$('a');
tmpNestedComplexRhs = 7;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: 7,7,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[['a'], [7, 7, 7], null];

