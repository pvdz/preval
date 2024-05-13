# Preval test case

# try_catch_return.md

> Ref tracking > Try-catch > Try catch return

## Options

- refTest

## Input

`````js filename=intro
function f() {
  
  let x = 1;
  try {
    $();
    x = 2; // overwrite 1, read by all
  } catch {
    $(x); // reads 1,2
    x = 3; // overwrite 1, 2 but is not observable
    return;
  }
  
  $(x); // must be 2. (3 always returns)
}
$(f);
`````

## Output

(Annotated with pids)

`````filename=intro
let f___4__ = function () {
  debugger;
  let x___10__ = 1;
  try /*13*/ {
    $();
    x___20__ = 2;
  } catch (e___22__) /*23*/ {
    $(x___27__);
    x___31__ = 3;
    return undefined___34__;
  }
  $(x___38__);
  return undefined___40__;
};
$(f___44__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 44          | none           | none
  - r @44      | 4

x:
  - w @10      | ########## | 27          | none           | 20,31
  - w @20      | ########## | 27,38       | 10             | 31
  - r @27      | 10,20
  - w @31      | ########## | not read    | 10,20          | none
  - r @38      | 20
