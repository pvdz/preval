# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  ($(1), b)[$('length')];
  $(c);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpCompObj = ($(1), b);
  const tmpCompProp = $('length');
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
  const tmpCompObj = ($(1), b);
  const tmpCompProp = $('length');
  tmpCompObj[tmpCompProp];
  $(c);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same
