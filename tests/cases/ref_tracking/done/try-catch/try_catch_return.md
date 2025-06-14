# Preval test case

# try_catch_return.md

> Ref tracking > Done > Try-catch > Try catch return

## Options

- refTest

## Input

`````js filename=intro
function f() {
  let x = 1;
  try {
    $();
    x = 2;
    // This part where x=2 should not be able to throw but
    // I think for now preval will consider that possible.
  } catch {
    $(x);     // x=1 2 (see above)
    x = 3;    // not observed (invariably due to the return)
    return;
  }
  $(x);       // must be 2
}
$(f);
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ f = function () /*6*/ {
    debugger;
    let /*___10__*/ x = 1;
    try /*13~20*/ {
      $();
      /*___20__*/ x = 2;
    } catch (/*___22__*/ e) /*23~34*/ {
      $(/*___27__*/ x);
      /*___31__*/ x = 3;
      return /*___34__*/ undefined;
    }
    $(/*___38__*/ x);
    return /*___40__*/ undefined;
  };
$(/*___44__*/ f);
`````


## Todos triggered


None


## Ref tracking result


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

e:
  - w @22      | ########## | not read    | none           | none
