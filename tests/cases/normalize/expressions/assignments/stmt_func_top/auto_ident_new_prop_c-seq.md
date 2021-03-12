# Preval test case

# auto_ident_new_prop_c-seq.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident new prop c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { $ };

  let a = { a: 999, b: 1000 };
  a = new (1, 2, $(b)).$(1);
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let b = { $ };
  let a = { a: 999, b: 1000 };
  a = new (1, 2, $(b)).$(1);
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  const tmpCompObj = $(b);
  const tmpNewCallee = tmpCompObj.$;
  a = new tmpNewCallee(1);
  $(a);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const b = { $: $ };
  const tmpCompObj = $(b);
  const tmpNewCallee = tmpCompObj.$;
  const SSA_a = new tmpNewCallee(1);
  $(SSA_a);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: {}
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
