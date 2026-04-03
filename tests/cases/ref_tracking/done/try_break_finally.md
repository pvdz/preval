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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ /*___7__*/ abc: /*8~52*/ {
  /* stmt(12): */ let /*___13__*/ $implicitThrow = false;
  /* stmt(15): */ let /*___16__*/ $finalStep = false;
  /* stmt(18): */ let /*___19__*/ $finalCatchArg = /*___20__*/ undefined;
  /* stmt(21): */ /*___22__*/ $finally: /*23~40*/ {
    /* stmt(24): */ try /*25~31*/ {
      /* stmt(26): */ /*___29__*/ $finalStep = true;
      /* stmt(30): */ break /*___31__*/ $finally;
    } catch (/*___33__*/ $finalImplicit) /*34~40*/ {
      /* stmt(35): */ /*___38__*/ x = 2;
      /* stmt(39): */ throw /*___40__*/ $finalImplicit;
    }
  }
  /* stmt(41): */ /*___44__*/ x = 2;
  /* stmt(45): */ if (/*___46__*/ $implicitThrow) {
    /*47~49*/ /* stmt(48): */ throw /*___49__*/ $finalCatchArg;
  } /*50~52*/ else {
    /* stmt(51): */ break /*___52__*/ abc;
  }
}
/* stmt(53): */ $(/*___56__*/ x);
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
