# Preval test case

# complex_object.md

> normalize > call > complex_object
>
> Calls should have simple objects

#TODO

## Input

`````js filename=intro
function b() { return $('b'); }
const a = {b: $};
$(a)[b()]($(1), $(2));
`````

## Normalized

`````js filename=intro
function b() {
  const tmpReturnArg = $('b');
  return tmpReturnArg;
}
const a = { b: $ };
const tmpCallCompObj = $(a);
const tmpCallCompProp = b();
const tmpCallCompVal = tmpCallCompObj[tmpCallCompProp];
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
tmpCallCompVal.call(tmpCallCompObj, tmpCalleeParam, tmpCalleeParam$1);
`````

## Output

`````js filename=intro
function b() {
  const tmpReturnArg = $('b');
  return tmpReturnArg;
}
const a = { b: $ };
const tmpCallCompObj = $(a);
const tmpCallCompProp = b();
const tmpCallCompVal = tmpCallCompObj[tmpCallCompProp];
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
tmpCallCompVal.call(tmpCallCompObj, tmpCalleeParam, tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { b: '"<$>"' }
 - 2: 'b'
 - 3: 1
 - 4: 2
 - 5: 1, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
