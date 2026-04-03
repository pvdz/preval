# Preval test case

# label_finally_finally_if_true_break_single_read4.md

> Ref tracking > Done > Try-random > Label finally finally if true break single read4
> 
> A break that travels through two finally nodes before reaching its label.
>
> This was actually a regression as the whole thing was collapsed, eliminating the label and if completely so the condition was ignored.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
back: {
  try {
    break back;
  } finally {
  }
  x = 6; // unreachable
}
$(x); // x=1
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ /*___7__*/ back: /*8~50*/ {
  /* stmt(12): */ let /*___13__*/ $implicitThrow = false;
  /* stmt(15): */ let /*___16__*/ $finalStep = false;
  /* stmt(18): */ let /*___19__*/ $finalCatchArg = /*___20__*/ undefined;
  /* stmt(21): */ /*___22__*/ $finally: /*23~42*/ {
    /* stmt(24): */ try /*25~31*/ {
      /* stmt(26): */ /*___29__*/ $finalStep = true;
      /* stmt(30): */ break /*___31__*/ $finally;
    } catch (/*___33__*/ $finalImplicit) /*34~42*/ {
      /* stmt(35): */ /*___38__*/ $implicitThrow = true;
      /* stmt(39): */ /*___42__*/ $finalCatchArg = /*___41__*/ $finalImplicit;
    }
  }
  /* stmt(43): */ if (/*___44__*/ $implicitThrow) {
    /*45~47*/ /* stmt(46): */ throw /*___47__*/ $finalCatchArg;
  } /*48~50*/ else {
    /* stmt(49): */ break /*___50__*/ back;
  }
}
/* stmt(51): */ $(/*___54__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 54          | none           | none
  - r @54      | 4

$implicitThrow:
  - w @13          | ########## | 44          | none           | 38
  - w @38          | ########## | 44          | 13             | none
  - r @44          | 13,38

$finalStep:
  - w @16          | ########## | not read    | none           | 29
  - w @29          | ########## | not read    | 16             | none

$finalCatchArg:
  - w @19          | ########## | 47          | none           | 42
  - w @42          | ########## | 47          | 19             | none
  - r @47          | 19,42

$finalImplicit:
  - w @33          | ########## | 41          | none           | none
  - r @41          | 33
