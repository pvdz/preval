# Preval test case

# decl_after.md

> normalize > dce > return > decl_after
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

#TODO

## Input

`````js filename=intro
function f() {
  if ($(false)) x = $('fail too');
  return;
  
  let x = $('fail');
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpIfTest = $(false);
  if (tmpIfTest) {
    x = $('fail too');
  }
  return undefined;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const tmpIfTest = $(false);
  if (tmpIfTest) {
    x = $('fail too');
  }
  return undefined;
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: false
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
