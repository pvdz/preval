# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  let c = "foo";
  ($(1), $(2))[$('toString')];
  $(c);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let c = 'foo';
  $(1);
  const tmpCompObj = $(2);
  const tmpCompProp = $('toString');
  tmpCompObj[tmpCompProp];
  $(c);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let c = 'foo';
  $(1);
  const tmpCompObj = $(2);
  const tmpCompProp = $('toString');
  tmpCompObj[tmpCompProp];
  $(c);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'toString'
 - 4: 'foo'
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same