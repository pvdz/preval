# Preval test case

# ident_sequence_complex.md

> Normalize > Binding > Stmt-global-block > Ident sequence complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
if ($(true)) {
  let b = 2, c = 3;
  let a = ($(b), $(c));
  $(a, b, c);
}
`````

## Pre Normal

`````js filename=intro
if ($(true)) {
  let b = 2,
    c = 3;
  let a = ($(b), $(c));
  $(a, b, c);
}
`````

## Normalized

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let b = 2;
  let c = 3;
  $(b);
  let a = $(c);
  $(a, b, c);
}
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(2);
  const a = $(3);
  $(a, 2, 3);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 2
 - 3: 3
 - 4: 3, 2, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
