# Preval test case

# ident_ident_simple.md

> Normalize > Binding > Stmt-global-block > Ident ident simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
if ($(true)) {
  let b = 2, c = 3;
  let a = b = c;
  $(a, b, c);
}
`````

## Normalized

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let b = 2;
  let c = 3;
  b = c;
  let a = b;
  $(a, b, c);
}
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(3, 3, 3);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 3, 3, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
