# Preval test case

# try_entry2.md

> Ref tracking > Done > Try-random > Try entry2
>
> The entryReads and entryWrites for a Try must be propagated which is relevant for loops.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x); // x=1
  while (true) {
    try {
      $(x);
      x = 2; // Does overwrite itself
    } catch {
      $(x);
    }
  }
  $(x); // unreachable
}
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ $(/*___9__*/ x);
/* stmt(10): */ while (true) {
  /*12~29*/ /* stmt(13): */ try /*14~22*/ {
    /* stmt(15): */ $(/*___18__*/ x);
    /* stmt(19): */ /*___22__*/ x = 2;
  } catch (/*___24__*/ e) /*25~29*/ {
    /* stmt(26): */ $(/*___29__*/ x);
  }
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,18,29     | none           | 22
  - r @9       | 4
  - r @18      | 4,22
  - w @22      | ########## | 18,29       | 4,22           | 22
  - r @29      | 4,22

e:
  - w @24      | ########## | not read    | none           | none
