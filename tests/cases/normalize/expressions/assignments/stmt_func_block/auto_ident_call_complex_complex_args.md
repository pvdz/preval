# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident call complex complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = { a: 999, b: 1000 };
    a = $($)($(1), $(2));
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    let b = { $ };
    let a = { a: 999, b: 1000 };
    a = $($)($(1), $(2));
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  const tmpCallCallee = $($);
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = f();
tmpCallCallee$1(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpCallCallee = $($);
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  const SSA_a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  $(SSA_a);
};
const tmpCalleeParam$2 = f();
$(tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: 1
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
