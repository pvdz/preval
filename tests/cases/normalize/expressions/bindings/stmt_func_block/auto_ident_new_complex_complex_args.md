# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident new complex complex args
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = new ($($))($(1), $(2));
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
    let a = new ($($))($(1), $(2));
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { $: $ };
  const tmpNewCallee = $($);
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  let a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
};
const tmpCallCallee = $;
const tmpCalleeParam$2 = f();
tmpCallCallee(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpNewCallee = $($);
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  const a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
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
 - 5: {}
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
