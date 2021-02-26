# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident new ident complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = { a: 999, b: 1000 };
    new $($(1), $(2));
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { $: $ };
  let a = { a: 999, b: 1000 };
  const tmpNewCallee = $;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
};
const tmpCallCallee = $;
const tmpCalleeParam$2 = f();
tmpCallCallee(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const f = function () {
  const a = { a: 999, b: 1000 };
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  new $(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
};
const tmpCalleeParam$2 = f();
$(tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: { a: '999', b: '1000' }
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
