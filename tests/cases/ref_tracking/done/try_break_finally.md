# Preval test case

# try_break_finally.md

> Ref tracking > Done > Try break finally
>
> The last read can't reach 1 at all.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
abc: try { 
  break abc;
} finally {
  x = 2; // overwrites x=1
}
$(x); // x=2
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
/*___7__*/ abc: /*8~52*/ {
  let /*___13__*/ $implicitThrow = false;
  let /*___16__*/ $finalStep = false;
  let /*___19__*/ $finalCatchArg = /*___20__*/ undefined;
  /*___22__*/ $finally: /*23~40*/ {
    try /*25~31*/ {
      /*___29__*/ $finalStep = true;
      break /*___31__*/ $finally;
    } catch (/*___33__*/ $finalImplicit) /*34~40*/ {
      /*___38__*/ x = 2;
      throw /*___40__*/ $finalImplicit;
    }
  }
  /*___44__*/ x = 2;
  if (/*___46__*/ $implicitThrow) {
    /*47~49*/ throw /*___49__*/ $finalCatchArg;
  } /*50~52*/ else {
    break /*___52__*/ abc;
  }
}
$(/*___56__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 38,44
  - w @38      | ########## | not read    | 4              | none
  - w @44      | ########## | 56          | 4              | none
  - r @56      | 44

$implicitThrow:
  - w @13          | ########## | 46          | none           | none
  - r @46          | 13

$finalStep:
  - w @16          | ########## | not read    | none           | 29
  - w @29          | ########## | not read    | 16             | none

$finalCatchArg:
  - w @19          | ########## | 49          | none           | none
  - r @49          | 19

$finalImplicit:
  - w @33          | ########## | 40          | none           | none
  - r @40          | 33
