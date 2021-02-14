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
  throw 'exit';
  
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
  throw 'exit';
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
  throw 'exit';
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: false
 - eval returned: ('<crash[ exit ]>')

Normalized calls: Same

Final output calls: Same
