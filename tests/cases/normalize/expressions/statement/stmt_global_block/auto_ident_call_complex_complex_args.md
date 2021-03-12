# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Statement > Stmt global block > Auto ident call complex complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
{
  let b = { $ };

  let a = { a: 999, b: 1000 };
  $($)($(1), $(2));
  $(a);
}
`````

## Pre Normal

`````js filename=intro
{
  let b = { $ };
  let a = { a: 999, b: 1000 };
  $($)($(1), $(2));
  $(a);
}
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCallCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
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
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
