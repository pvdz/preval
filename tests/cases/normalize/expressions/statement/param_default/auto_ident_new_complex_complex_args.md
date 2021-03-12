# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Statement > Param default > Auto ident new complex complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f(p = new ($($))($(1), $(2))) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpNewCallee = $($);
    const tmpCalleeParam = $(1);
    const tmpCalleeParam$1 = $(2);
    p = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
  } else {
    p = tmpParamDefault;
  }
};
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam$2 = f();
tmpCallCallee(tmpCalleeParam$2);
$(a);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpNewCallee = $($);
    const tmpCalleeParam = $(1);
    const tmpCalleeParam$1 = $(2);
    new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
  }
};
const a = { a: 999, b: 1000 };
const tmpCalleeParam$2 = f();
$(tmpCalleeParam$2);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: undefined
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
