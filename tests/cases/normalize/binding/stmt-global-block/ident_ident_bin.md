# Preval test case

# ident_ident_bin.md

> normalize > assignment > stmt > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
if ($(true)) {
  let b = 2, c = 3, d = 4;
  let a = b = c + d;
  $(a, b, c);
}
`````

## Normalized

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let b = 2;
  let c = 3;
  let d = 4;
  let a;
  const tmpNestedComplexRhs = c + d;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  $(a, b, c);
}
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let b = 2;
  let a;
  b = 7;
  a = 7;
  $(a, b, 7);
}
`````

## Result

Should call `$` with:
 - 1: true
 - 2: 7, 7, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: true
 - 2: 7, 7, 7
 - eval returned: undefined
