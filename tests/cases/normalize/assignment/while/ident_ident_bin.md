# Preval test case

# ident_ident_bin.md

> normalize > assignment > while > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 0, d = 0;
while (a = b = c + d);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
let c = 0;
let d = 0;
while (true) {
  tmpNestedComplexRhs = c + d;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  const tmpIfTest = tmpNestedComplexRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
let a = 1;
let b = 2;
while (true) {
  tmpNestedComplexRhs = 0;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  const tmpIfTest = tmpNestedComplexRhs;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b, 0);
`````

## Result

Should call `$` with:
 - 0: 0,0,0
 - 1: undefined

Normalized calls: Same

Final output calls: Same
