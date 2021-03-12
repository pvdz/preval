# Preval test case

# ident_sequence_complex.md

> Normalize > Binding > Stmt-func-block > Ident sequence complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = 2, c = 3;
  let a= ($(b), $(c));
  $(a, b, c);
}
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  if ($(true)) {
    let b = 2,
      c = 3;
    let a = ($(b), $(c));
    $(a, b, c);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let b = 2;
    let c = 3;
    $(b);
    let a = $(c);
    $(a, b, c);
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $(2);
    const a = $(3);
    $(a, 2, 3);
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 2
 - 3: 3
 - 4: 3, 2, 3
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
