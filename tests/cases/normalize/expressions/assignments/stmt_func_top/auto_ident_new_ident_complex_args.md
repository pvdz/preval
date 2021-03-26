# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident new ident complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { $ };

  let a = { a: 999, b: 1000 };
  a = new $($(1), $(2));
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let b = { $ };
  let a = { a: 999, b: 1000 };
  a = new $($(1), $(2));
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  const tmpNewCallee = $;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  a = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
};
const tmpCallCallee = $;
const tmpCalleeParam$3 = f();
tmpCallCallee(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const SSA_a = new $(tmpCalleeParam, tmpCalleeParam$1);
$(SSA_a);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: {}
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
