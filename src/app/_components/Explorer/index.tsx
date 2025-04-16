import Breadcrumb from "./Breadcrumb";
import ExplorerTable from "./Table";

export default function Explorer() {
  return (
    <div className="size-full p-3 bg-white rounded-2xl ">
      <Breadcrumb paths={['base','Code','FrontEnd']} dropdown={[['Code','System'],['FrontEnd','Java','Go']]}/>
      <ExplorerTable/>
    </div>
  );
}