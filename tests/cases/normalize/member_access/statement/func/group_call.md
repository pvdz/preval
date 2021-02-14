# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
function f() {
  ($(1), $(2), $($)).length;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  $(1);
  $(2);
  const tmpCompObj = $($);
  tmpCompObj.length;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  $(1);
  $(2);
  const tmpCompObj = $($);
  tmpCompObj.length;
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
 - 3: '<$>'
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
