# Preval test case

# sequence_ident_computed.md

> Normalize > Member access > Statement > Func > Sequence ident computed
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  let b = "foo", c = 1;
  ($(1), b)[$('length')];
  $(c);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = 'foo';
  let c = 1;
  $(1);
  const tmpCompObj = b;
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
  $(1);
  const tmpCompProp = $('length');
  'foo'[tmpCompProp];
  $(1);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'length'
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
