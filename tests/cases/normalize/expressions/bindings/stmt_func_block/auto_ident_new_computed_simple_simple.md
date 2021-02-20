# Preval test case

# auto_ident_new_computed_simple_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident new computed simple simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = new b["$"](1);
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { $: $ };
  const tmpNewCallee = b.$;
  let a = new tmpNewCallee(1);
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const b = { $: $ };
  const tmpNewCallee = b.$;
  const a = new tmpNewCallee(1);
  $(a);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: {}
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
