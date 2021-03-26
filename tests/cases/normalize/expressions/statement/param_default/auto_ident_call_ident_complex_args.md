# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Statement > Param default > Auto ident call ident complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f(p = $($(1), $(2))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? $($(1), $(2)) : tmpParamBare;
};
let b = { $ };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    const tmpCalleeParam$1 = $(2);
    p = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  } else {
    p = tmpParamBare;
  }
};
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$1(tmpCalleeParam$3);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
$(tmpCalleeParam, tmpCalleeParam$1);
$(undefined);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: undefined
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
