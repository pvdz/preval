# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident delete prop c-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let arg = { y: 1 };

    let a = delete ($(1), $(2), $(arg)).y;
    $(a, arg);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let arg = { y: 1 };
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  let a = delete tmpDeleteObj.y;
  $(a, arg);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const arg = { y: 1 };
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  const a = delete tmpDeleteObj.y;
  $(a, arg);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: true, {}
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
